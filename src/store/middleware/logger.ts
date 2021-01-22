const logger = () => (state: any) => (next: any) => (action: any) => {
    console.log(`Middleware working!, this is the current state that passed: ${state}`)
    next(action)
}

export type UserState = ReturnType<typeof logger>

export default logger