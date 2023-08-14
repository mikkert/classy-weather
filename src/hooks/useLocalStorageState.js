import { useEffect, useState } from 'react'

export default function useLocalStorageState(initialValue, key) {
    const [value, setValue] = useState(
        () => JSON.parse(localStorage.getItem(key)) || initialValue,
    )

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue]
}
