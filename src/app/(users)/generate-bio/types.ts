export interface Classification {
    classification: string;
    career_stage: string;
    key_strengths: string[];
    market_position: {
        local_scene: string;
        broader_market: string;
    };
    commercial_potential: string;
    genre_authenticity: number;
    unique_selling_points: string[];
    development_areas: string[];
    target_audience: string[];
    collaboration_potential: string;
    reason: string;
    known_songs: {
        title: string;
        year: string;
        popularity: 'underground' | 'local_hit' | 'regional_hit' | 'major_hit';
    }[];
    tags: string[];
    performance_style: string[];
    brand_identity: {
        visual_aesthetic: string;
        core_message: string;
        audience_connection: 'minimal' | 'developing' | 'strong' | 'exceptional';
    };
    market_trends: {
        trend: string;
        relevance: 'low' | 'medium' | 'high';
    }[];
} 