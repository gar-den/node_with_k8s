import {MigrationInterface, QueryRunner} from "typeorm";

export class userCreate11655857927017 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`userId` int NOT NULL AUTO_INCREMENT COMMENT 'user id', `name` varchar(10) NOT NULL COMMENT 'user name', `phone` varchar(174) NOT NULL COMMENT 'user phone without hyphen(-)', PRIMARY KEY (`userId`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `user`");
    }

}
