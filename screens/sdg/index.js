import { ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Markdown from 'react-native-markdown-display';

import { AuthenticatedContext } from '../../context/authenticated-context';
import ChildScreen from '../../components/child-screen';
import { api } from '../../data';

const Sdg = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [sdgData, setSdgData] = useState([]);
  const authContext = useContext(AuthenticatedContext);
  const token = authContext.user.token;
  const { sdg } = route.params;

  useEffect(() => {
    axios
      .get(`${api}/sdgs/${sdg.number}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSdgData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.response.data.error);
        console.log('An error occurred:', error.response);
      });
  }, []);

  return (
    <ChildScreen headerColor={sdg.color} sdgImageSrc={sdg.src}>
      {loading ? <ActivityIndicator size="large" /> : <Markdown>{sdgData.body}</Markdown>}
    </ChildScreen>
  );
};

export default Sdg;
