"use client";
import { createDoctor, getDoctors, updateDoctor } from "@/lib/actions/doctor"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Console } from "console";
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

export function useUpdateDoctor(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateDoctor, 
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["getDoctors"]});
        },
        onError: (error) => console.error("Failed to update doctor:", error),
    });
}