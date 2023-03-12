CREATE TABLE "rooms" (
    "id" varchar2(36),
    "name" varchar2(256) NOT NULL,
    "size" number(1,0) NOT NULL,
    CONSTRAINT "PK_rooms_id" PRIMARY KEY ("id")
);
