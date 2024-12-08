import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import freshlistVideo from '../assets/FRESHLIST.mp4'; 

const LandingPage = () => {
  const navigation = useNavigation(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('LogIn'); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <div style={styles.container}>
      <video
        src={freshlistVideo}
        style={styles.video}
        autoPlay
        
        muted
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#004725', 
  },
  video: {
    width: '100%',
    height: '100%',
  },
};

export default LandingPage;