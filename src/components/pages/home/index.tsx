import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/routes';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTES.Board);
  });

  return <div>Home</div>;
}

export default Home;
