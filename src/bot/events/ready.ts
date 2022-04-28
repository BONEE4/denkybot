import type { ChatInputApplicationCommandData } from 'discord.js';
import { Event } from '../../structures/Event';
import type { DenkyClient } from '../../types/Client';

export default class ReadyEvent extends Event {
  constructor() {
    super();
    this.eventName = 'ready';
  }

  override async run(client: DenkyClient) {
    console.log('✅ \x1b[34m[DENKY]\x1b[0m', `Shard ${client.shard?.ids[0]} connected.`);

    if (!global.IS_MAIN_PROCESS) return;
    const finalData: ChatInputApplicationCommandData[] = [];
    for (const command of client.commands.values()) finalData.push(command.options);

    await client.application?.commands.set(finalData);
    console.log('✅ \x1b[34m[COMMANDS]\x1b[0m', `Posted ${finalData.length} commands to Discord!`);
  }
}
