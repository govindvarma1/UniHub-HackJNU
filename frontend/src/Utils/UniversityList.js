export const ConvertList = (List) => {
    return List.map((item) => ({label: item.name, value: item._id}))
}