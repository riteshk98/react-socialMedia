import { useState } from 'react';
import { UseAuth } from '../hooks';
import styles from '../styles/settings.module.css';
import { toast } from 'react-hot-toast';
const Settings = () => {
  const auth = UseAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name);
  const [password, setPassword] = useState('');
  const [savingForm, setSavingForm] = useState(false);

  const updateProfile = async () => {
    setSavingForm(true);
    let error = false;
    if (!name || !password) {
      console.log(name+password);
      toast.error('Err Occurred');
      error = true;
    }
    if (error) {
      setSavingForm(false);
      return;
    }

    const clearForm = () => {
      setPassword('');
    };
    const response = await auth.updateUser(auth.user._id, name, password);
    if (response.success) {
      setEditMode(false);
      setSavingForm(false);
      return toast.success('Saved Successfully');
    } else {
      toast.error(response.message);
    }
    setSavingForm(false);
    clearForm();
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img src="https://picsum.photos/200/300" alt="" />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldName}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {editMode && (
        <div className={styles.field}>
          <div className={styles.fieldName}>Password</div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? 'Saving profile...' : 'Save profile'}
            </button>
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditMode(false)}
            >
              Go back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
