const dev = {
    baseUrl: 'https://localhost:44343',
}

const prod = {
    baseUrl: 'https://localhost:44343',
}


export const variables = process.env.NODE_ENV === 'development' ? dev : prod