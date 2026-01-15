"use server";

import React from "react";
import { prisma } from "../prisma";

export async function getAppointments(){
    try{
        const appointments = await prisma.appointment.findMany({
            include:{
                user:{
                    select:{
                        firstName:true,
                        lastName:true,
                        email: true,
                    }
                },
                doctor:{ select:{name: true,imageUrl: true}},
            },
            orderBy:{ createdAt:"desc"},
        });

    }catch (error){
        console.log("Error fetching appointments:", error);
        throw new Error("Failed to fetch appointments");
    }
}