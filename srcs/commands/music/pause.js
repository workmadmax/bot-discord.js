/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pause.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mdouglas <mdouglas@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/09/22 11:20:16 by mdouglas          #+#    #+#             */
/*   Updated: 2024/09/22 11:22:14 by mdouglas         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { useTimeline } = require("discord-player")
const embeds = require('../embeds')

module.exports = {
    data: {
        name: 'pause',
        description: 'Pause the current song!',
    },
    execute: async ({ client, interaction }) => {

        const timeline = useTimeline(interaction.guildId)
        const channel = interaction.member.voice.channel

        if (!channel) {
            await interaction.reply('Channel not found!')
            return
        }

        if (!timeline?.track) {
            await interaction.reply('track not found!')
            return
        }

        if (timeline.paused) {
            await interaction.reply('The current track is already paused!\nUse /resume to unpause!')
            return
        }

        timeline.pause()
        await interaction.reply({ embeds: [embeds.embedNotification(interaction, `[${timeline.track.description}] - PAUSADA!`, '/resume para despausar', 'https://i.ibb.co/zxbVLqG/pause.png')] })
    }
}