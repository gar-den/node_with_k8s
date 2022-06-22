import {MigrationInterface, QueryRunner} from "typeorm";

export class userCreate1655881988861 implements MigrationInterface {
    name = 'userCreate1655881988861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`userId\` int NOT NULL AUTO_INCREMENT COMMENT 'user id', \`name\` varchar(10) NOT NULL COMMENT 'user name', \`phone\` varchar(174) NOT NULL COMMENT 'user phone without hyphen(-)', PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
