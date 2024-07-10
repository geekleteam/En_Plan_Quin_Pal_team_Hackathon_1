"use client"; 
import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

import ChatBox from '../chatbox/Chatbox'
import DataTable from '../table/table'
import Layout from './mainLayout'
const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 ">
        <ChatBox />
      </div>
    </div>
  )
}



export default Hero
