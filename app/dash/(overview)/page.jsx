import { HomePageChart } from "@/components/charts/homePageChart"
import AddClient from "@/components/clients/add-client"
import { Button } from "@/components/ui/button"


export default function Dash() {
  return (
    <main className="flex-grow p-2 md:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium">Dash</h1>        
      </div>
      <div className="flex items-center justify-between">
        <HomePageChart />
      </div>
    </main>
  )
}
