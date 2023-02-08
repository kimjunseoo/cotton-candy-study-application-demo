import Room from '../Models/room';

const path = require('path');

export const getHome = (req, res) => {
    return res.sendFile(path.join(__dirname + "/../Views/home.html"));
};

export const getError = (req, res) => {
    return res.sendFile(path.join(__dirname + "/../Views/error.html"));
}

export const getCreateNewRoom = async (req, res) => {
    // 3~4자리의 랜덤 난수 초대 코드
    const inviteCode = Math.floor(Math.random() * 10000)

    // 난수로 생성된 초대 코드가 이미 존재하는지 검증
    const roomExist = await Room.exists({ inviteCode: inviteCode });
    if(roomExist){
        return res.redirect("/rooms/create"); 
    }

    // 초대 코드를 가진 Room 을 DB에 저장
    try{
        await Room.create({
            inviteCode: inviteCode,
        })
    } catch (error){
        return res.redirect("/error");
    }

    return res.redirect(`/rooms/${inviteCode}`);
}

export const getJoinRoom = (req, res) => {
    
    return res.sendFile(path.join(__dirname + "/../Views/room.html"))
}

