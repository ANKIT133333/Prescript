import React from 'react'
import Header from '../Components/Header'
import SpecialityMenu from '../Components/SpecialityMenu'
import TopDoctor from '../Components/TopDoctor'
import Banner from '../Components/Banner'
import RelatedDoctors from '../Components/RelatedDoctors'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      <TopDoctor/>
      <Banner/>
      <RelatedDoctors/>
    </div>
  )
}

export default Home
