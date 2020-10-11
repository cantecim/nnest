import { Controller, Get, Logger, Param } from "@nestjs/common";
import { DocumentType } from '@typegoose/typegoose';
import { UserProfileService } from "../services/user-profile.service";
import { UserProfileSchemaType } from "../schemas/user-profile.schema";

@Controller("users")
export class UsersController {
  constructor(private readonly logger: Logger,
              private readonly userProfileService: UserProfileService) {
    logger.setContext(this.constructor.name);
  }

  @Get(':id/profile')
  async getOne(@Param("id") userId: string): Promise<DocumentType<UserProfileSchemaType>> {
    return this.userProfileService.getOne(userId);
  }
}
