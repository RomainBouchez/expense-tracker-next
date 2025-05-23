export interface User {
    id: number;
    username: string;
}

export interface Category {
    id: number;
    nom: string;
    type: 'depense' | 'revenu';
    icone_nom?: string | null;
    created_at: string;
}

export interface Transaction {
    id: number;
    montant: number;
    date_transaction: string; // YYYY-MM-DD
    description?: string | null;
    categorie_id: number;
    categorie_nom?: string; // For display
    type_transaction: 'depense' | 'revenu';
    created_at: string;
    updated_at: string;
}

export type TransactionFormData = Omit<Transaction, 'id' | 'created_at' | 'updated_at' | 'categorie_nom'> & {
    categorie_id: string | number; // Can be string from form
};


export interface Abonnement {
    id: number;
    nom: string;
    montant: number;
    frequence: 'hebdomadaire' | 'mensuel' | 'trimestriel' | 'semestriel' | 'annuel';
    jour_du_mois?: number | null;
    jour_de_semaine?: number | null;
    date_prochaine_echeance: string; // YYYY-MM-DD
    categorie_id: number;
    categorie_nom?: string; // For display
    actif: boolean;
    created_at: string;
    updated_at: string;
}