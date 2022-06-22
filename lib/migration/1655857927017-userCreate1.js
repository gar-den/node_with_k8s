"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreate11655857927017 = void 0;
class userCreate11655857927017 {
    async up(queryRunner) {
        await queryRunner.query("CREATE TABLE `user` (`userId` int NOT NULL AUTO_INCREMENT COMMENT 'user id', `name` varchar(10) NOT NULL COMMENT 'user name', `phone` varchar(174) NOT NULL COMMENT 'user phone without hyphen(-)', PRIMARY KEY (`userId`)) ENGINE=InnoDB");
    }
    async down(queryRunner) {
        await queryRunner.query("DROP TABLE `user`");
    }
}
exports.userCreate11655857927017 = userCreate11655857927017;
//# sourceMappingURL=1655857927017-userCreate1.js.map