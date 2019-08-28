'use strict'

const Chat = use('App/Models/Chat');
const Ws = use('Ws');
class ChatController {

    async guardarMensaje({response,request}) {
        var {idChat, mensaje, emisor}= request.all();

        var mensajito = {
            Mensaje: mensaje,
            Emisor: emisor
        };

        // console.log(mensajito)

        var guardado;
        await Chat.findOneAndUpdate(
            {Salon: idChat},
            {$push: {"Mensajes": {Mensaje: mensaje, Emisor: emisor}}},
            {safe: true, upsert: true},
            function(err, model) {
                if (!err) {
                    var channel = Ws.getChannel('salon:*');
                    var topic = channel.topic('salon:' + idChat);
                    topic.broadcast('mensaje', {emisor, mensaje});
                }
            }
        );
    
        // var kek = await Chat.findOne({Salon: idChat});

        // console.log(kek)
        return response.status(200).json({msg: "guardao"});
      }

    async historial({params, response}) {
        const { id } = params;

        console.log(params)

        var chat = await Chat.findOne({
            Salon: id,
            funcion(err, docs) {
                console.log(err);
            }
        });

        return response.status(200).json({
            mensajes: chat.Mensajes
        });
    }


}

module.exports = ChatController
