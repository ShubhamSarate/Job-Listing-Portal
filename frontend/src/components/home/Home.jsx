import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAlljobs from '@/hooks/useGetAlljobs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
  useGetAlljobs();
  const {user} = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if(user?.role === 'recruiter'){
      navigate("/admin/companies");
    }
  },[]);
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home;

