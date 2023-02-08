import Room from '../Models/room';

const path = require('path');

// 루트 페이지
export const getHome = (req, res) => {
    return res.sendFile(path.join(__dirname + "/../Views/home.html"));
};

// 에러가 catch 되었을 시, 이동되는 URL에 대한 컨트롤러
export const getError = (req, res) => {
    return res.sendFile(path.join(__dirname + "/../Views/error.html"));
}

// 새로운 방 생성
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

// 방 참여 시
export const getJoinRoom = (req, res) => {
    
    return res.sendFile(path.join(__dirname + "/../Views/room.html"));
}

// 초대 코드를 통한 방 입장 페이지
export const getJoinByCode = (req, res) => {

    return res.sendFile(path.join(__dirname + "/../Views/joinByCode.html"));
}

// 초대 코드를 받아 room 으로 이동시키는 컨트롤러
export const postJoinByCode = async (req, res) => {

    const inviteCode = req.body.inviteCode;

    const inviteCodeExist = await Room.exists( { inviteCode: inviteCode });

    if(!inviteCodeExist){
        return res.sendFile(path.join(__dirname + "/../Views/notFoundinviteCode.html"));
    }

    return res.redirect(`/rooms/${inviteCode}`);
}