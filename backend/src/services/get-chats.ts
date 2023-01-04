import { Message } from '../models/message';

const getChats = async (id: string) => {

    return Message.aggregate()
        .match({usersId: {$in: [id]}})
        .addFields({
            userId: {
                $toObjectId: {
                    $cond: {
                        if: {$eq: [{$arrayElemAt: ['$usersId', 0]}, id]},
                        then: {$arrayElemAt: ['$usersId', 1]},
                        else: {$arrayElemAt: ['$usersId', 0]}
                    }
                }
            }
        })
        .lookup({
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
        })
        .addFields({
            user: {$arrayElemAt: ['$user', 0]}
        })
        .sort({createAt: -1})
        .group({
            _id: '$messageId',
            user: {$first: '$user'},
            createAt: {$first: '$createAt'},
            unread: {
                $sum: {
                    $cond: [
                        {
                            $and: [
                                {$eq: ['$to', id]},
                                {$eq: ['$seen', false]}
                            ]
                        },
                        1,
                        0
                    ]
                }
            }
        })
        .sort({createAt: -1})
        .project({
            'user.password': 0,
            'createAt': 0
        })
}

export default getChats;
