/* eslint-disable import/no-anonymous-default-export */
export const normalizedDayAvialability = (value) => {

    if (!value) {
        return [];
    }

    const normalizedDays = value.split(",").map((day) => {
        const capitalLetter = day[0].toUpperCase();
        let label = `${capitalLetter}${day.slice(1, day.length)}`;
        return { value: day, label };
    });

    return normalizedDays;
}

export const flattenDayAvailability = (value) => {
    let defaultValue = '';

    if (Array.isArray(value) && value.length) {
        const normalizedDays = value.map((day) => day.value).join(",");
        defaultValue = normalizedDays;
    }

    return defaultValue
}

export default { normalizedDayAvialability, flattenDayAvailability }
