import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import styles from "../styles/Modal.module.css";

const Modals = ({ toggle, isOpen, decs, onClick, titleBtn }) => {

  return (
    <span className={styles["modal-section"]}>
      <Modal isOpen={isOpen} toggle={toggle} className={styles["modal"]}>
        <ModalBody className={styles["body"]}>
          <p>{decs}</p>
        </ModalBody>
        <ModalFooter className={styles["footer"]}>
          <Button onClick={toggle} className={styles["closeBtn"]}>
            Close
          </Button>
          <Button onClick={onClick} className={styles["dynamicBtn"]}>
            {titleBtn}
          </Button>
        </ModalFooter>
      </Modal>
    </span>
  );
};

export default Modals;
