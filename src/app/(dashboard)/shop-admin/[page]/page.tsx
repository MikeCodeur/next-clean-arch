import {ProductsManagement} from './products-management'
import withAuth, {withAuthAdmin} from '@/components/features/auth/withAuth'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
//import {getProductsPaginationService} from '@/services/product-service'
import productServiceInterceptor from '@/services/interceptors/product-service-logger-interceptor'
import {canQuickAddProduct} from '@/services/authorization/authorization-service'
import {cn} from '@/lib/utils'

async function Page(props: {params: Promise<{page: string}>}) {
  const canQuickAdd = await canQuickAddProduct()
  const params = await props.params
  const {page} = params
  const currentPage = Number.parseInt(page, 10) || 1
  const nbElement = 4 // Nombre d'éléments par page
  const start = (currentPage - 1) * nbElement
  const {products, totalProducts} =
    await productServiceInterceptor.getProductsPaginationService(
      nbElement,
      start
    )
  const totalPages = Math.ceil(totalProducts / nbElement)
  const maxPagesToShow = 5 // Maximum number of pagination links to show

  // Determine the start and end page numbers
  let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1)
  let endPage = startPage + maxPagesToShow - 1

  if (endPage > totalPages) {
    endPage = totalPages
    startPage = Math.max(endPage - maxPagesToShow + 1, 1)
  }

  const pagesToShow = Array.from(
    {length: endPage - startPage + 1},
    (_, i) => startPage + i
  )

  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Administration de la boutique
      </h1>
      <Link href="/shop-admin/quick" className={cn({hidden: !canQuickAdd})}>
        <Button className="m-4">Ajout Rapide</Button>
      </Link>
      {/* <Button href="/shop-admin/quick">Ajout Rapide</Button> */}
      <ProductsManagement products={products ?? []} />
      <div className="mt-5">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={currentPage > 1 ? `/shop-admin/${currentPage - 1}` : '#'}
                isActive={currentPage === 1}
              />
            </PaginationItem>
            {/* Page Numbers */}
            {pagesToShow.map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href={`/shop-admin/${pageNum}`}
                  isActive={pageNum === currentPage}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={
                  currentPage < totalPages
                    ? `/shop-admin/${currentPage + 1}`
                    : '#'
                }
                isActive={totalPages === currentPage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
export default withAuth(Page)
