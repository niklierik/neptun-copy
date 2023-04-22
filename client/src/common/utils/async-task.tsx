/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState, useEffect } from "react";
import Header from "../header";
import { handleError } from "../utils";
import useSWR from "swr";

export interface AsyncTaskResult<T> {
    data?: T | null;
    html?: JSX.Element;
    setData?: (value: T | null) => void;
}

export function asyncTask<T>(
    id: string,
    task: () => Promise<T>,
): AsyncTaskResult<T> {
    const {
        data: rawData,
        error,
        isLoading,
    } = useSWR(id, task, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    });
    const [errors, setErrors] = useState<string[]>([]);
    const [data, setData] = useState<T | null>(null);
    useEffect(() => {
        if (error) {
            handleError(error, setErrors);
            return;
        }
        setData(rawData ?? null);
    }, [rawData, error]);
    if (errors.length > 0) {
        return {
            html: (
                <div className="error_div">
                    {errors.map((e, id) => (
                        <p key={id}>{e}</p>
                    ))}
                </div>
            ),
        };
    }
    if (isLoading) {
        return {
            html: <p className="white_text">Betöltés...</p>,
        };
    }
    return {
        data,
        setData,
    };
}
