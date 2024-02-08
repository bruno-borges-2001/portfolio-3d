import ModalContainer from "./ModalContainer"

function Project({ children }: { children?: React.ReactNode }) {
  return (
    <ModalContainer>
      {children}
    </ModalContainer>
  )
}

export default Project
