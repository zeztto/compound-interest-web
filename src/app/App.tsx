import {CalculatorContainer} from "./components/calculator/CalculatorContainer";
import {Toaster} from "./components/ui/sonner";
export default function App(){return <main className="min-h-screen bg-background py-8"><CalculatorContainer /><Toaster position="top-center" style={{transition:"none"}} /></main>;}
