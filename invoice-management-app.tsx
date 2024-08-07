import React, { useState } from 'react';
import { PlusCircle, Send, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const InvoiceApp = () => {
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({ 
    id: '', 
    amount: '', 
    description: '', 
    recipient: '' 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newInvoice.id && newInvoice.amount && newInvoice.description && newInvoice.recipient) {
      setInvoices(prev => [...prev, { ...newInvoice, id: Date.now().toString() }]);
      setNewInvoice({ id: '', amount: '', description: '', recipient: '' });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice Management</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create New Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="amount"
              value={newInvoice.amount}
              onChange={handleInputChange}
              placeholder="Amount"
              className="w-full"
            />
            <Input
              type="text"
              name="description"
              value={newInvoice.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="w-full"
            />
            <Input
              type="text"
              name="recipient"
              value={newInvoice.recipient}
              onChange={handleInputChange}
              placeholder="Recipient"
              className="w-full"
            />
            <Button type="submit" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Invoice
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {invoices.map((invoice) => (
          <Card key={invoice.id}>
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <p className="font-semibold">{invoice.recipient}</p>
                <p className="text-sm text-gray-500">{invoice.description}</p>
                <p className="text-lg font-bold">${invoice.amount}</p>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InvoiceApp;
