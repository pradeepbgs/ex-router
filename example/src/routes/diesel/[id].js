export const GET = async (ctx) => {
    const param = ctx.params.id
    return ctx.send(param)
}