import { Button } from "../button"
import { Input } from "../input"
import { Form as FORM, FormControl, FormField, FormItem, FormMessage } from "../form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    min: z.coerce.number(),
    max: z.coerce.number()
})

export default function Form({ subject, setSubject, data }) {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            min: data.min,
            max: data.max
        }
    })

    const onsubmit = (Values) => {
        setSubject(Values)
    }
    return (
        <>
            <FORM {...form}>
                <div className="flex w-full h-screen">
                    <div className="p-4 m-auto w-96 md:w-2/3 bg-white rounded shadow-sm">
                        <h3 className=" first-letter:uppercase font-bold text-lg mx-2 my-2">{subject}</h3>
                        <form onSubmit={form.handleSubmit(onsubmit)}>
                            <div className="flex justify-between">
                                <FormField
                                    control={form.control}
                                    name="min"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="w-full mx-2">
                                                    <Input className="w-max" type='text' {...field} placeholder='Minimum Value' />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="max"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="w-full mx-2">
                                                    <Input className="w-max" type='text' {...field} placeholder='Maximum Value' />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mx-2 my-2 w-full">
                                <Button type='submit' className='w-full'>Submit</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </FORM>
        </>
    )
}