/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   play.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mdouglas <mdouglas@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/09/22 11:10:47 by mdouglas          #+#    #+#             */
/*   Updated: 2024/09/22 11:23:06 by mdouglas         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js")
const { useMainPlayer, Player } = require("discord-player")
const { YoutubeiExtractor } = require("discord-player-youtubei")
const embeds = require('../embeds')


module.exports = {

    data: {
        name: 'play',
        description: 'Play Song!',
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: 'search',
                description: 'Choose the URL!',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ],
    },
    execute: async ({ client, interaction }) => {
		
        const player = useMainPlayer()
        const channel = interaction.member.voice.channel

        if (!channel) {
            await interaction.reply('Channel not found!')
            return
        }

        const query = interaction.options.getString('search', true)
        await interaction.deferReply();

        try {
            const { track } = await player.play(channel, query, {
                nodeOptions: {
                    metadata: interaction,
                    noEmitInsert: true,
                    leaveOnStop: false,
                    leaveOnEmpty: true,
                    leaveOnEmptyCooldown: 60000,
                    leaveOnEnd: true,
                    leaveOnEndCooldown: 60000,
                    pauseOnEmpty: true,
                    preferBridgedMetadata: true,
                    disableBiquad: true,
                },
                requestedBy: interaction.user,
                connectionOptions: {
                    deaf: true,
                },
                seek: 60000,
            });

            embedQueue = embeds.embedNotification(interaction, `[${track.title}] add!`, 'mdouglas')
            await interaction.followUp({ embeds: [embedQueue] });
        } catch (err) {
            await interaction.followUp(`Something went wrong: ${err}`);
        }
    }
}