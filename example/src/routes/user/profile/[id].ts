import {type ContextType} from 'diesel-core'

export const GET = async (ctx:ContextType) => {
    const {id} = ctx.params
    
    const mockUserProfile = {
        id: id,
        name: "John Doe",
        email: "john.doe@example.com",
        bio: "Software Engineer | Tech Enthusiast",
        location: "San Francisco, CA",
        joinDate: "2023-01-15",
        followers: 1234,
        following: 567
    }

    return ctx.json({
        user: mockUserProfile
    })
}
