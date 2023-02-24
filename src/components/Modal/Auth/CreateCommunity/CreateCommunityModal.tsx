import React from 'react';
import { Button, Modal, ModalHeader, ModalCloseButton, ModalContent, ModalOverlay, ModalBody, ModalFooter } from '@chakra-ui/react';

type CreateCommunityModalProps = {
    open: boolean;
    handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
    open,
    handleClose,
}) => {

    return (
        <>
            <Modal isOpen={open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Here is the modal Body
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Create Community</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default CreateCommunityModal;