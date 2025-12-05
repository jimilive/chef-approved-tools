'use client'

import { useEffect, useState } from 'react'
import { getSupabase } from '@/lib/supabase'

interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  affiliate_links: Array<{
    url: string
    vendor: string
    tag?: string
    lastChecked: string
  }>
  primary_affiliate: string
  updated_at: string
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<any>({})
  const [saveStatus, setSaveStatus] = useState<string>('')

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    setLoading(true)
    const { data, error } = await getSupabase()
      .from('products')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error loading products:', error)
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }

  function startEdit(product: Product) {
    setEditingProduct(product.id)
    setEditForm({
      affiliate_links: product.affiliate_links,
      primary_affiliate: product.primary_affiliate
    })
    setSaveStatus('')
  }

  function cancelEdit() {
    setEditingProduct(null)
    setEditForm({})
    setSaveStatus('')
  }

  async function saveProduct(productId: string) {
    setSaveStatus('Saving...')

    try {
      const response = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          affiliate_links: editForm.affiliate_links,
          primary_affiliate: editForm.primary_affiliate
        })
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('Error saving product:', result.error)
        setSaveStatus('Error saving!')
      } else {
        setSaveStatus('Saved!')
        setEditingProduct(null)
        loadProducts()
        setTimeout(() => setSaveStatus(''), 2000)
      }
    } catch (error) {
      console.error('Error saving product:', error)
      setSaveStatus('Error saving!')
    }
  }

  function updateAffiliateLink(index: number, field: string, value: string) {
    const newLinks = [...editForm.affiliate_links]
    newLinks[index] = { ...newLinks[index], [field]: value }
    setEditForm({ ...editForm, affiliate_links: newLinks })
  }

  function addAffiliateLink() {
    setEditForm({
      ...editForm,
      affiliate_links: [
        ...editForm.affiliate_links,
        {
          url: '',
          merchant: 'amazon',
          tag: '',
          lastChecked: new Date().toISOString()
        }
      ]
    })
  }

  function removeAffiliateLink(index: number) {
    const newLinks = editForm.affiliate_links.filter((_: any, i: number) => i !== index)
    setEditForm({ ...editForm, affiliate_links: newLinks })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Loading products...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Product Admin Dashboard</h1>
          <p className="text-gray-700">Manage affiliate links and product data</p>
        </div>

        {saveStatus && (
          <div className={`mb-4 p-4 rounded ${
            saveStatus.includes('Error')
              ? 'bg-red-100 text-red-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {saveStatus}
          </div>
        )}

        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-sm text-gray-700">
                  {product.brand} • {product.category} • Slug: {product.slug}
                </p>
              </div>

              {editingProduct === product.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Primary Affiliate
                    </label>
                    <select
                      value={editForm.primary_affiliate}
                      onChange={(e) => setEditForm({ ...editForm, primary_affiliate: e.target.value })}
                      className="border rounded px-3 py-2 w-48"
                    >
                      <option value="amazon">Amazon</option>
                      <option value="walmart">Walmart</option>
                      <option value="target">Target</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium">
                        Affiliate Links
                      </label>
                      <button
                        onClick={addAffiliateLink}
                        className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        + Add Link
                      </button>
                    </div>

                    {editForm.affiliate_links.map((link: any, index: number) => (
                      <div key={index} className="border rounded p-3 mb-2 bg-gray-50">
                        <div className="grid grid-cols-2 gap-3 mb-2">
                          <div>
                            <label className="block text-xs text-gray-700 mb-1">
                              Vendor
                            </label>
                            <select
                              value={link.vendor}
                              onChange={(e) => updateAffiliateLink(index, 'vendor', e.target.value)}
                              className="border rounded px-2 py-1 w-full text-sm"
                            >
                              <option value="amazon">Amazon</option>
                              <option value="walmart">Walmart</option>
                              <option value="target">Target</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-700 mb-1">
                              Tag (optional)
                            </label>
                            <input
                              type="text"
                              value={link.tag || ''}
                              onChange={(e) => updateAffiliateLink(index, 'tag', e.target.value)}
                              className="border rounded px-2 py-1 w-full text-sm"
                              placeholder="e.g., chefapprovedt-20"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-700 mb-1">
                            Affiliate URL
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={link.url}
                              onChange={(e) => updateAffiliateLink(index, 'url', e.target.value)}
                              className="border rounded px-2 py-1 flex-1 text-sm font-mono"
                              placeholder="https://amzn.to/..."
                            />
                            <button
                              onClick={() => removeAffiliateLink(index)}
                              className="text-red-600 hover:text-red-800 text-sm px-2"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => saveProduct(product.id)}
                      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-medium"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Primary Affiliate: <span className="text-blue-600">{product.primary_affiliate}</span>
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Affiliate Links ({product.affiliate_links.length}):
                    </p>
                    <div className="space-y-1">
                      {product.affiliate_links.map((link, index) => (
                        <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                          <span className="font-medium text-blue-600">{link.vendor}</span>:{' '}
                          <span className="font-mono text-xs">{link.url}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => startEdit(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Edit Affiliate Links
                  </button>
                </div>
              )}

              <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                Last updated: {new Date(product.updated_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            No products found. Run the migration script to import products.
          </div>
        )}
      </div>
    </div>
  )
}
