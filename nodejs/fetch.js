import { useQuery } from '@tanstack/react-query'
import { getFoodWithPrisma, getAllFoodWithPrisma, createFoodWithPrisma, updateFoodWithPrisma, deleteFoodWithPrisma, getAllOrdersWithPrisma } from '../index.js'

export function llamarTodoMenu() {
    // Access the client
    //Main poner un <QueryClientProvider client={queryClient}>
    const queryClient = useQueryClient()
    // Queries
    const allMenu = useQuery({ queryKey: ['todoMenu'], queryFn: getAllFoodWithPrisma })
}
export function llamarComida() {
    // Access the client
    const queryClient = useQueryClient()
    // Queries
    const menuFood = useQuery({ queryKey: ['menuComida'], queryFn: getFoodWithPrisma })
}
export function crearComida() {
    // Access the client
    const queryClient = useQueryClient()
    // Queries
    const nuevoPedido = useQuery({ queryKey: ['creadoComida'], queryFn: createFoodWithPrisma })
}
export function borrarComida() {
    // Access the client
    const queryClient = useQueryClient()
    // Queries
    const noPedido = useQuery({ queryKey: ['borradoComida'], queryFn: deleteFoodWithPrisma })
}
export function actualizarComida() {
    // Access the client
    const queryClient = useQueryClient()
    // Queries
    const cambioComida = useQuery({ queryKey: ['actualizadoComida'], queryFn: updateFoodWithPrisma })
}

//PEDIDOS
export function llamarTodoPedidos() {
    const queryClient = useQueryClient()
    const allOrder = useQuery({ queryKey: ['todoPedidos'], queryFn: getAllOrdersWithPrisma })
}
