import React from 'react'

import styles from "../styles/AddressDetails.module.css"

const AddressDetails = ({address, telp, onSetAddress, onsetTelp}) => {
  return (
    <span className={styles["address-detail-bottom"]}>
      <input
        type="text"
        name="address"
        id="address"
        value={address}
        className={styles["address"]}
        onChange={onSetAddress}
      />
      <input
        type="number"
        name="telp"
        id="telp"
        value={telp}
        className={styles["telp"]}
        onChange={onsetTelp}
      />
    </span>
  );
}

export default AddressDetails