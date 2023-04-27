-- Kurzus létrehozása
-- Params:
-- - id: tantárgy ID-je
-- - displayName: tantárgy megnevezése
-- - credit: tantárgy mennyi kreditet ér
-- - hoursAWeek: heti óraszám, kurzus tartamát számoljuk ki vele
-- - type: tantárgy típusa (ea = 0 / gyak = 1)

INSERT INTO "SYSTEM"."subjects"("id","displayName","credit","hoursAWeek","type")
VALUES(:id,:displayName,:credit,:hoursAWeek,:type);
