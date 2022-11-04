import styled from 'styled-components'

const Wrapper = styled.div`
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background: #222;
  background: ${({theme}) => theme.colors.gray};
  opacity: 50%;
  z-index: 999999;
`
const Container = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 999999;
  overflow: hidden;
`

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid ${({theme}) => theme.colors.gray};;
  border-top: 10px solid #383636;

  border-radius: 50%;
  animation: spinner 1.5s linear infinite;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
export const LoadingSpinner = () => {
	return (
		<Wrapper>
			<Container>
				<Spinner/>
			</Container>
		</Wrapper>
	)
}