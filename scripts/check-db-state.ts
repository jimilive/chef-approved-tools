import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function checkProductNames() {
  const { data, error } = await supabase
    .from('products')
    .select('slug, name')
    .in('slug', [
      'benriner-large-mandoline',
      'john-boos-platinum-commercial-cutting-board',
      'lodge-seasoned-cast-iron-3-skillet-bundle'
    ]);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Current database state:');
  console.log('======================');
  data.forEach(p => {
    console.log(`${p.slug}:`);
    console.log(`  Name: '${p.name}'`);
    console.log('');
  });
}

checkProductNames();
