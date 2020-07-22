import { MigrationInterface, getRepository } from "typeorm";
import { User } from "../entity/User";

export class CreateAdminUser1595355841038 implements MigrationInterface {
  public async up(): Promise<void> {
    const user = new User();
    user.username = "admin";
    user.password = "admin";
    user.hashPassword();
    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
