// Pins the numbers from rounds-handoff.md sections 6-8 so later features cannot drift.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SEED_CERTS, type Cert } from '../data/catalog.ts';
import { RULE_SOURCES } from '../data/rules.ts';
import { blsExpiry, caStatus, countsToward, daysUntil, flStatus, shortestPath } from './engine.ts';

const certFor = (course: string, hours: number, fl: Cert['fl'], ca = true): Cert => ({
  id: 'x-' + course, title: course, hours, prov: 'Rounds Learning', date: '2026-11-21', fl, ca, src: 'platform', course,
});

test('start state: Florida 20/24 with Medical Errors and Impairment missing', () => {
  const fl = flStatus(SEED_CERTS);
  assert.equal(fl.done, 20);
  assert.equal(fl.total, 24);
  assert.deepEqual(fl.missingTopics.map((r) => r.key), ['medErrors', 'impairment']);
  assert.equal(fl.generalFull, true); // 18 raw general hours, capped at 16
  assert.equal(fl.reqs.find((r) => r.key === 'general')!.raw, 18);
});

test('start state: California 18/30', () => {
  const ca = caStatus(SEED_CERTS);
  assert.equal(ca.done, 18);
  assert.equal(ca.left, 12);
});

test('start state: shortest path is 4 courses, 12 h, required topics first', () => {
  const p = shortestPath(SEED_CERTS);
  assert.deepEqual(p.courses.map((c) => c.id), ['med-errors', 'impairment', 'high-alert', 'delirium']);
  assert.equal(p.hours, 12);
  assert.equal(p.complete, false);
});

test('after Medical Errors: Florida 22/24, California 20/30, path 3 courses', () => {
  const certs = [...SEED_CERTS, certFor('med-errors', 2, 'medErrors')];
  assert.equal(flStatus(certs).done, 22);
  assert.equal(caStatus(certs).done, 20);
  assert.deepEqual(shortestPath(certs).courses.map((c) => c.id), ['impairment', 'high-alert', 'delirium']);
});

test('after the whole path: everything complete, path recommends nothing', () => {
  const certs = [
    ...SEED_CERTS,
    certFor('med-errors', 2, 'medErrors'),
    certFor('impairment', 2, 'impairment'),
    certFor('high-alert', 4, 'general'),
    certFor('delirium', 4, 'general'),
  ];
  assert.equal(flStatus(certs).complete, true);
  assert.equal(caStatus(certs).complete, true);
  const p = shortestPath(certs);
  assert.equal(p.complete, true);
  assert.equal(p.courses.length, 0);
});

test('extra general hours never fill a required topic', () => {
  const certs = [...SEED_CERTS, certFor('handoff', 2, 'general'), certFor('high-alert', 4, 'general')];
  assert.deepEqual(flStatus(certs).missingTopics.map((r) => r.key), ['medErrors', 'impairment']);
  assert.equal(flStatus(certs).done, 20);
});

test('outside certificate without CEP adds nothing to California', () => {
  const upload: Cert = { id: 'u1', title: 'Antimicrobial Stewardship for Nurses', hours: 3, prov: 'Gulf Coast Critical Care Conference', date: '2026-10-14', fl: 'general', ca: false, src: 'upload' };
  const certs = [...SEED_CERTS, upload];
  assert.equal(caStatus(certs).done, 18);
  assert.equal(flStatus(certs).done, 20);
});

test('counts-toward labels', () => {
  assert.deepEqual(countsToward({ fl: 'medErrors', ca: true }).map((t) => t.label), ['Florida · Medical Errors', 'California']);
  assert.deepEqual(countsToward({ fl: 'general', ca: false }).map((t) => t.label), ['Florida · general']);
});

test('days until a deadline and BLS end-of-month expiry', () => {
  assert.equal(daysUntil('2027-04-30', new Date(2026, 10, 21)), 160);
  const exp = blsExpiry(new Date(2026, 10, 21));
  assert.equal(exp.getFullYear(), 2028);
  assert.equal(exp.getMonth(), 10);
  assert.equal(exp.getDate(), 30);
});

test('every rule keeps an https source link', () => {
  for (const r of RULE_SOURCES) {
    assert.ok(r.sources.length > 0, r.id);
    for (const s of r.sources) assert.match(s.url, /^https:\/\//);
  }
});
