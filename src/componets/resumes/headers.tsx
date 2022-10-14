import Avatar from "../../assets/avatar.png"
import styled from "styled-components";
import moment from "moment";

const UserAvatar = styled.img`
  width: 30px;
  height: 30px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  justify-content: space-around;
`

const Surname = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
`

const Date = styled.span`
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;

  color: rgba(32, 32, 32, 0.5);
`

export const HeaderWithUser = ({surname,date}: {surname: string, date: Date}) => {
    return <>
        <Container>
            <UserAvatar src={Avatar}/>

            <DescriptionContainer>
                <Surname>{surname}</Surname>
                <Date>{moment(date).format("DD MMMM HH:mm")}</Date>

            </DescriptionContainer>
        </Container>
    </>
}