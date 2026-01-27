"use client";
import { createDoctor, getDoctors } from "@/lib/actions/doctors"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as React from "react"

export function useGetDoctors(){
    const result = useQuery({
        queryKey: ["getDoctors"],
        queryFn: getDoctors,
    });

    return result;
}

export function useCreateDoctor(){
    const queryCLient = useQueryClient()

    const result =  useMutation({
        mutationFn:createDoctor,
        onSuccess:() =>{
            //Invalidate related queries to refresh the data 
            queryCLient.invalidateQueries({queryKey:["getDoctors"]});
        },
        onError:(error) =>console.log("Error while creating a doctor"),
    });

    return result;
}