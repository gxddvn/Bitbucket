import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1729001356590 implements MigrationInterface {
  name = 'CreateUsersTable1729001356590';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "phone_number" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone_number"`);
  }
}
