import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateChannelDto } from './dto/createChannel.dto';
import { ChannelService } from './channel.service';
import { Channel } from './schemas/channel.schema';

@Controller('channels')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  async create(@Body() createChannelDto: CreateChannelDto) {
    try {
      const channel = await this.channelService.CreateChannel(createChannelDto);
      return { message: 'Channel created successfully', channel };
    } catch (err) {
      console.error('Error in channel creation:', err.message);
      return { message: 'Failed to create channel', error: err.message };
    }
  }

  @Get()
  async findAll(): Promise<Channel[]> {
    return this.channelService.findAllChannel();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.channelService.DeleteChannel(id);
    return { message: 'Channel deleted successfully' };
  }

  @Post(':channelId/integrateUser')
  async integrateUserIntoChannel(
    @Param('channelId') channelId: string,
    @Body('userId') userId: string,
  ) {
    return this.channelService.integrationUsersIntoChannel(channelId, userId);
  }

  @Patch(':channelId/update')
  async updateChannel(
    @Param('channelId') channelId: string,
    @Body() updatedChannel: Channel,
  ) {
    const updated = await this.channelService.updateChannel(
      channelId,
      updatedChannel,
    );
    return { message: 'Channel updated successfully', updatedChannel: updated };
  }

  @Delete(':channelId/removeUser/:userId')
  async deleteUserFromChannel(
    @Param('userId') userId: string,
    @Param('channelId') channelId: string,
  ) {
    await this.channelService.deleteUserFromChannel(userId, channelId);
    return { message: 'User deleted from channel successfully' };
  }

  @Get('publicChannel')
  async getAllChannelWhereTypeIsPublic() {
    return this.channelService.GetAllChannelWhereTypeIsPublic();
  }

  @Patch(':channelId/addBadWords')
  async addBadWords(
    @Param('channelId') channelId: string,
    @Body('badWords') badWords: string[],
  ) {
    try {
      return await this.channelService.AddBadWords(channelId, badWords);
    } catch (error) {
      throw new Error('Error adding bad words: ' + error.message);
    }
  }

  @Patch(':channelId/UpdateBadWords')
  async removeBadWords(
    @Param('channelId') channelId: string,
    @Body('badWords') badWords: string[],
  ) {
    return this.channelService.RemoveBadWords(channelId, badWords);
  }

  @Get(':userId/channels')
  async getChannelByUserId(@Param('userId') userId: string) {
    return this.channelService.findChannelByUserId(userId);
  }

  @Post(':channelId/demandForIntegration')
  async sendDemandForIntegration(
    @Body('userId') userId: string,
    @Param('channelId') channelId: string,
  ) {
    return this.channelService.sendDemandForIntegration(userId, channelId);
  }

  @Post(':channelId/acceptDemand')
  async acceptDemand(@Body('userId') userId: string) {
    return this.channelService.AcceptDemand(userId);
  }

  @Get(':channelId/AllDemand')
  async getAllDemand(@Param('channelId') channelId: string) {
    return this.channelService.GetAllDemand(channelId);
  }
  @Patch(':channelId/refused')
  async refuseDemand(@Body('userId') userId: string, @Param('channelId') channelId: string) {
    return this.channelService.RefuseDemand(userId, channelId);
  }



}
