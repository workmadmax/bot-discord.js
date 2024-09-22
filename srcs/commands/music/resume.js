/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   resume.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mdouglas <mdouglas@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/09/22 11:26:04 by mdouglas          #+#    #+#             */
/*   Updated: 2024/09/22 11:28:57 by mdouglas         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { useTimeline } = require("discord-player");
const embed = require("../util/embeds")

module.exports = {
    data: {
        name: 'resume',
        description: 'resume song!'
    },
    execute: async ({ client, interaction }) => {

        const timeline = useTimeline(interaction.guildId)
        const channel = interaction.member.voice.channel

        if (!channel) {
            await interaction.reply('Channel not Found!')
            return
        }

        if (!timeline?.track) {
            await interaction.reply('Track not Found!')
            return
        }

        if (!timeline.paused) {
            await interaction.reply('The current track is already paused!\nUse /resume to unpause!')
            return
        }

        timeline.resume()

        await interaction.reply({ embeds: [embed.embedNotification(interaction, `[${timeline.track.description}]
			 - RETOMADO!`, '/queue preciso verificar esse embed e melhorar', 'Blue')] })
    }
}