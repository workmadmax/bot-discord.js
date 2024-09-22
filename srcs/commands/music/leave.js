/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   leave.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mdouglas <mdouglas@student.42sp.org.br>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/09/22 11:14:20 by mdouglas          #+#    #+#             */
/*   Updated: 2024/09/22 11:22:11 by mdouglas         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { useQueue } = require("discord-player")
const embeds = require('../embeds')

module.exports = {
    data: {
        name: 'leave',
        description: 'Desconectar o bot e excluir a fila de músicas atual'
    },
    execute: async ({ client, interaction }) => {
        const queue = useQueue(interaction.guildId)

        const embed = embeds.embedError(interaction, 'Finished, choose the next song.', '../../../assets/images')

        if (!queue) {
            return interaction.reply({ embeds: [embed] });
        }
        queue.delete()
        return interaction.reply({ embeds: [embed] });
    }
}